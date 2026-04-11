import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react'

interface SectionTableProps {
    sections: Section[],
    isLoading: boolean;
    onPreview: (section: Section) => void;
    onCreateSection: () => void;
}

const SectionTable = ({ sections, isLoading, onPreview, onCreateSection }: SectionTableProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow className='border-white/5 hover:bg-transparent'>
                    <TableHead className='text-xs uppercase font-medium text-zinc-500'>
                        Name
                    </TableHead>
                    <TableHead className='text-xs uppercase font-medium text-zinc-500'>
                        Sources
                    </TableHead>
                    <TableHead className='text-xs uppercase font-medium text-zinc-500'>
                        Tone
                    </TableHead>
                    <TableHead className='text-xs uppercase font-medium text-zinc-500'>
                        Scope
                    </TableHead>
                    <TableHead className='text-xs uppercase font-medium text-zinc-500 '>
                        Status
                    </TableHead>
                    <TableHead className='text-xs uppercase font-medium text-zinc-500 text-right'>
                        Action
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-48 text-center">
                            <div className="flex items-center justify-center gap-3 text-zinc-500">

                                {/* Spinner */}
                                <div className="w-5 h-5 border-2 border-zinc-600 border-t-transparent rounded-full animate-spin"></div>

                                <span>Loading sections...</span>
                            </div>
                        </TableCell>
                    </TableRow>
                ) : sections?.length > 0 ? (
                    sections.map((section) => (
                        <TableRow key={section.id}>

                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={6} className="h-48 text-center text-zinc-500">
                            No sections found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default SectionTable