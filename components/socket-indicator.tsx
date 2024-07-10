"use client"
import { useSocket } from "./ui/providers/socket-provider"
import { Badge } from "./ui/badge"

export const SocketIndicator = () => {
    const { isConnected } = useSocket();
    if (!isConnected) {
        return <Badge variant="outline" className="bg-yellow-600 text-white border-none">
            Hitting every 1s
        </Badge>
    }
    return <Badge variant="outline" className="bg-emerald-600 text-white border-none">
            LIVE Real-time updates
    </Badge>
}