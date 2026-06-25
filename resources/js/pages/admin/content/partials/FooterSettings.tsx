import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';
import { update as adminContentUpdate } from '@/routes/admin/content';

export default function FooterSettings({ initialData }: { initialData: any }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        content: {
            subtitle: initialData?.subtitle || '',
            catchphrase: initialData?.catchphrase || '',
        },
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(adminContentUpdate({ section: 'footer' }), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit}>
            <Card className="border-sidebar-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>Pied de page (Footer)</CardTitle>
                    <CardDescription>
                        Modifiez les textes affichés tout en bas du site.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="subtitle">Sous-titre</Label>
                        <Input
                            id="subtitle"
                            value={data.content.subtitle}
                            onChange={(e) => setData('content', { ...data.content, subtitle: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="catchphrase">Accroche de fin</Label>
                        <Input
                            id="catchphrase"
                            value={data.content.catchphrase}
                            onChange={(e) => setData('content', { ...data.content, catchphrase: e.target.value })}
                            placeholder="ex: Fait avec amour en Belgique."
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
