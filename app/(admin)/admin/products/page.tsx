'use client'
import Button from "@/app/shared/components/UIKIT/Button/Button";
import { AxiosInterceptor } from "@/app/shared/core/http";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@heroui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { FormRelease } from "@/lib/utils";

export default function Page() {
    const [asc, setAsc] = useState<boolean>(true)
    const [filter, setFilter] = useState<string>("id")
    const [checked, setChecked] = useState<string[]>([])


    useEffect(() => {
        getProducts()
    }, [asc, filter, checked])

    const getProducts = async () => {
        const req = await AxiosInterceptor.$get('/products/all', {
            asc, filter, checked: checked.join(',')
        })
    }

    const createProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        const data: {title: string} = FormRelease.extract(e)
        console.log(data);
        
    }

    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        {['id', 'price'].map((i,idx) =>
                            <TableHead key={idx}
                                onClick={() => {
                                    setAsc(!asc)
                                    setFilter(i)
                                }} 
                            >
                                <div className="flex gap-2 cursor-pointer hover:text-foreground-900">
                                    {i}
                                    {filter === i ? 
                                        asc ? <ChevronUp /> : <ChevronDown />
                                        : <></>
                                    }
                                </div>
                            </TableHead>
                        )}
                        <TableHead>title</TableHead>
                        <TableHead>
                            <Popover>
                                <PopoverTrigger>
                                    category
                                </PopoverTrigger>
                                <PopoverContent>
                                    {['Phones', 'Watches', "Computers"].map((i, idx) =>
                                     <div className="flex gap-2 items-center">
                                        <Checkbox 
                                            checked={checked.includes(i)}
                                            onCheckedChange={() => {
                                                if (checked.includes(i)){
                                                    setChecked(prev => prev.filter(e => e !== i) )
                                                } else{
                                                    setChecked(prev => [...prev, i])
                                                }
                                            }}
                                            />
                                        {i}
                                     </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    <TableRow>
                        <TableCell  colSpan={4}>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button style="black_outline">sdfsdf</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <Form validationBehavior='native' onSubmit={createProduct}>
                                        <Label htmlFor="title">Название товара</Label>
                                        <Input name='title' id='title' required placeholder="Название..."/>
                                    <button type="submit">send</button>
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Apple Iphone 13 Pro Max</TableCell>
                        <TableCell>Phones</TableCell>
                        <TableCell>$500,00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Apple Iphone 13 Pro Max</TableCell>
                        <TableCell>Phones</TableCell>
                        <TableCell>$500,00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Apple Iphone 13 Pro Max</TableCell>
                        <TableCell>Phones</TableCell>
                        <TableCell>$500,00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Apple Iphone 13 Pro Max</TableCell>
                        <TableCell>Phones</TableCell>
                        <TableCell>$500,00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Apple Iphone 13 Pro Max</TableCell>
                        <TableCell>Phones</TableCell>
                        <TableCell>$500,00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}