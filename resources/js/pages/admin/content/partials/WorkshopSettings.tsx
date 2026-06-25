import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { update as adminContentUpdate } from '@/routes/admin/content';

export default function WorkshopSettings({ initialData }: { initialData: any }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        content: {
            title: initialData?.title || '',
            button_label: initialData?.button_label || '',
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(adminContentUpdate({ section: 'workshop' }), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Card className="border-sidebar-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>Atelier (Workshop)</CardTitle>
                    <CardDescription>
                        Gérez le titre et le bouton de la section de présentation des ateliers.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre de la section</Label>
                        <Input
                            id="title"
                            value={data.content.title}
                            onChange={(e) => setData('content', { ...data.content, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="button_label">Label du bouton</Label>
                        <Input
                            id="button_label"
                            value={data.content.button_label}
                            onChange={(e) => setData('content', { ...data.content, button_label: e.target.value })}
                        />
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
