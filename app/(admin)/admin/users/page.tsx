'use client'
import { AxiosInterceptor } from "@/app/shared/core/http";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";


export default function Page() {
    const [open, setOpen] = useState<boolean>(false)
    const [type, setType] = useState<string>("orders")
    const [userid, setUserId] = useState<number>(0)
    const [content, setContent] = useState<IOrder[] | IBasket[] | IWishlist[]>([])
    
    useEffect(() => {
        getContent()
    }, [open])

    const getContent = async() => {
        const response = AxiosInterceptor.$get("/"+type+'/all/'+userid)
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {['id', 'email', 'orders', 'wishlist', 'basket', 'register'].map((i, idx) =>
                            <TableHead key={idx}>{i}</TableHead>
                        )}
                        
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>example@example.com</TableCell> 
                        {['orders', 'wishlist', 'basket'].map((i,idx) => 
                            // {
                            //    if (i === 'orders') {
                            //     return <TableCell key={idx}>5</TableCell>
                            //    }  else if (i === 'wishlist') {
                            //     return <TableCell key={idx}>10</TableCell>
                            //    } else {
                            //     return <TableCell key={idx}>7</TableCell>
                            //    }
                            // }
                            <TableCell key={idx}>
                                <Dialog open={open} setOpen={() => setOpen(!open)}>
                                    <DialogTrigger>
                                       {users[i]}
                                    </DialogTrigger>
                                    <DialogContent>
                                       {content.map((i, idx) => 
                                            <div key={idx}>{i.title}</div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
                        )}
                        <TableCell>16.04.2025</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}