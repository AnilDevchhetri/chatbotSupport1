'use client'
import { AvatarGroup } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { AvatarFallback } from '@base-ui/react';
import { Plus } from 'lucide-react';
import { Avatar } from 'radix-ui';


import React, { useEffect, useState } from 'react'

interface TeamMember {
    id: string;
    name: string;
    user_email: string;
    image?: string;
    role?: string;
    status?: string;
}

const TeamSection = () => {

    const [team, setTeam] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newMemberEmail, setNewMemberEmail] = useState("");
    const [newMemberName, setNewMemberName] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

    useEffect(() => {
        fetchTeam();
    }, [])

    const fetchTeam = async () => {
        try {
            const res = await fetch("/api/team/fetch");
            if (res.ok) {
                const data = await res.json();
                setTeam(data.team)
            }

        } catch (error) {
            console.log(error, "TeamMemeber featching error");
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddMember = async () => {
        if (!newMemberEmail) {
            return;
        }
        setIsAdding(true);
        try {
            const res = await fetch("/api/team/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: newMemberEmail, name: newMemberName })
            });
            if (res.ok) {
                setNewMemberEmail("");
                setNewMemberName("");
                setOpenDialog(false);
                fetchTeam();
            } else {
                const error = await res.json();
                console.log(error);
            }
        } catch (error) {
            console.error("Failded to add memeber: ", error)
        } finally {
            setIsAdding(false);
        }
    }

    return (
        <Card className='border-white/5 bg-[#0a0a0e]'>
            <CardHeader className='flex flex-row items-center justify-between'>
                <div>
                    <CardTitle>
                        Team Members
                    </CardTitle>
                    <CardDescription>Manage your team and their access.</CardDescription>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogTrigger asChild>
                        <Button size="sm" className='bg-white text-black hover:bg-zinc-200'>
                            <Plus className='w-4 h-4 mr-2' />
                            Add Memeber
                        </Button>
                    </DialogTrigger>
                    <DialogContent className='bg-[#0E0E12] border-white/10 text-white sm:max-w-106.25'>
                        <DialogHeader>
                            <DialogTitle>
                                Add Team Memebr
                            </DialogTitle>
                            <DialogDescription className='text-zinc-400'>
                                Add a new member to your oganization. They will be added immediately.
                            </DialogDescription>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <div className='grid gap-2'>
                                <Label htmlFor='name' className='text-zinc-300'>
                                    Name
                                </Label>
                                <Input id="name" placeholder='Anil Chhetri' value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)}

                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>

                            <div className='grid gap-2'>
                                <Label htmlFor='Email' className='text-zinc-300'>
                                    Email
                                </Label>
                                <Input id="email" placeholder='Anil Chhetri' value={newMemberEmail} onChange={(e) => setNewMemberEmail(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white"
                                />
                            </div>
                        </div>
                        <DialogFooter className='bg-transparent border-none'>
                            <Button variant={"outline"} onClick={(e) => setOpenDialog(false)}
                                className='border-white/10 bg-white/5 text-zinc-300 hover:bg-white/5'
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleAddMember}
                                disabled={isAdding}
                                className='bg-white text-black hover:bg-zinc-200'
                            >
                                Add Member
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className='space-y-4'>
                    {
                        isLoading ? (
                            <div className='text-center py-4 text-zinc-500 text-sm'>Loading...</div>
                        ) : team.length === 0 ? (
                            <div className='text-center py-4 text-zinc-500 text-sm'>No team member.</div>
                        ) : (
                            <div className='grid gap-4'>
                                {
                                    team.map((member) => (
                                        <div key={member.id} className=' flex items-center justify-between p-3  border-white/5 rounded-lg border bg-white/1  hover:bg-white/2 transition-colors'>
                                            <div className='flex items-center gap-3'>
                                                <div className="h-9 w-9 rounded-full bg-gray-200 text-gray-700 border border-white/10 flex items-center justify-center text-sm font-semibold">
                                                    {member.name?.slice(0, 2).toUpperCase() || "UN"}
                                                </div>

                                                <div>
                                                    <div className='flex items-center gap-2'>
                                                        <p className='text-sm font-medium text-white'>
                                                            {member.name || "Unknown"}
                                                        </p>
                                                        <Badge
                                                            variant={"secondary"}
                                                            className={
                                                                cn("capitalize border mx-1 mb-1",
                                                                    member.status === "active"
                                                                        ? "bg-emerald-500/10 text-emerald-500 border-white/5"
                                                                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 hover:bg-yellow-500/20"
                                                                )
                                                            }
                                                        >
                                                            {member.status}
                                                        </Badge>
                                                    </div>
                                                    <p className='text-xs text-zinc-500'>
                                                        {member.user_email}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <Badge variant={"secondary"}
                                                    className='bg-white/5 capitalize text-zinc-400 hover:bg-white/10 border-white/5 mx-1'
                                                >
                                                    {member.role}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </CardContent>
        </Card>
    )
}

export default TeamSection