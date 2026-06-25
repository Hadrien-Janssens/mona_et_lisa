import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Plus, Trash2 } from 'lucide-react';
import { update as adminContentUpdate } from '@/routes/admin/content';

export default function ContactSettings({ initialData }: { initialData: any }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        content: {
            title: initialData?.title || '',
            subtitle: initialData?.subtitle || '',
            email: initialData?.email || '',
            address: initialData?.address || '',
            phones: initialData?.phones || [''],
        },
    });

    const addPhone = () => {
        setData('content', {
            ...data.content,
            phones: [...data.content.phones, '']
        });
    };

    const removePhone = (index: number) => {
        const newPhones = [...data.content.phones];
        newPhones.splice(index, 1);
        setData('content', { ...data.content, phones: newPhones });
    };

    const updatePhone = (index: number, value: string) => {
        const newPhones = [...data.content.phones];
        newPhones[index] = value;
        setData('content', { ...data.content, phones: newPhones });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(adminContentUpdate({ section: 'contact' }), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Card className="border-sidebar-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>Contact</CardTitle>
                    <CardDescription>
                        Mettez à jour vos coordonnées (email, adresse, téléphones).
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre</Label>
                            <Input
                                id="title"
                                value={data.content.title}
                                onChange={(e) => setData('content', { ...data.content, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Sous-titre</Label>
                            <Input
                                id="subtitle"
                                value={data.content.subtitle}
                                onChange={(e) => setData('content', { ...data.content, subtitle: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Adresse Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.content.email}
                            onChange={(e) => setData('content', { ...data.content, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Adresse Postale</Label>
                        <Textarea
                            id="address"
                            value={data.content.address}
                            onChange={(e) => setData('content', { ...data.content, address: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-sidebar-border">
                        <div className="flex items-center justify-between">
                            <Label>Numéros de téléphone</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addPhone}>
                                <Plus className="h-4 w-4 mr-2" /> Ajouter un numéro
                            </Button>
                        </div>
                        
                        <div className="space-y-3">
                            {data.content.phones.map((phone: string, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input
                                        placeholder="ex: +33 6 12 34 56 78"
                                        value={phone}
                                        onChange={(e) => updatePhone(index, e.target.value)}
                                        className="flex-1"
                                    />
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon"
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                        onClick={() => removePhone(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t border-sidebar-border px-6 py-4 flex items-center justify-end gap-2">
                    {recentlySuccessful && <p className="text-sm text-emerald-600 mr-2">Enregistré avec succès !</p>}
                    <Button type="submit" disabled={processing}>
                        {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Enregistrer
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
