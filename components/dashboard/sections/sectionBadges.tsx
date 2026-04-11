import { Badge } from "@/components/ui/badge";

export function getStatusBadge(status: SectionStatus) {
    switch (status) {
        case "active":
            return (
                <Badge className="border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                    Active
                </Badge>
            );

        case "draft":
            return (
                <Badge className="border-yellow-500/20 text-yellow-500 bg-yellow-500/5">
                    Draft
                </Badge>
            );

        case "disabled":
            return (
                <Badge className="border-red-500/20 text-red-500 bg-red-500/5">
                    Disabled
                </Badge>
            );

        default:
            return null;
    }
}

export function getToneBage(tone: Tone) {
    switch (tone) {
        case 'strict':
            return <Badge variant="ghost" className="border-red-500/20 text-red-500 bg-red-500/5">Strict</Badge>
        case 'neutral':
            return <Badge variant="outline" className="border-blue-500/20 text-blue-500 bg-blue-500/5">Neutral</Badge>
        case 'friendly':
            return <Badge variant="outline" className="border-indigo-500/20 text-indigo-500 bg-indigo-500/5">Friendly</Badge>
        case 'empathetic':
            return <Badge variant="outline" className="border-purple-500/20 text-purple-500 bg-purple-500/5">Empathetic</Badge>

    }
}