import Button from '../components/Button';
import Card from '../components/Card';
import Subtitle from '../components/Subtitle';
import Subtitle2 from '../components/Subtitle2';

export default function Contact({ content }: { content: any }) {
    return (
        <div className="relative overflow-hidden">
            <div className="mx-auto w-full max-w-250 py-20">
                <Subtitle>{content?.title || 'Contact Title'}</Subtitle>
                <Subtitle2>{content?.subtitle}</Subtitle2>

                <div className="flex w-full justify-between">
                    {/* LEFT SIDE  */}
                    <div className="mt-10 space-y-8">
                        <Card idx={0}>
                            <p>
                                <strong>Email :</strong> {content?.email}
                            </p>
                        </Card>
                        <Card idx={1}>
                            <p style={{ whiteSpace: 'pre-wrap' }}>
                                <strong>Adresse :</strong> {content?.address}
                            </p>
                        </Card>

                        <Card idx={2}>
                            <div>
                                <strong>Téléphones :</strong>
                                <ul>
                                    {content?.phones?.map(
                                        (phone: string, idx: number) => (
                                            <li key={idx}>{phone}</li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </Card>
                    </div>
                    {/* RIGHT SIDE  */}
                    <div className="flex basis-1/2 justify-end">
                        <Card>
                            <form className="space-y-5">
                                <div className="flex gap-5">
                                    <div className="flex flex-col">
                                        <Subtitle2>
                                            <label htmlFor="name">
                                                Ton prénom
                                            </label>
                                        </Subtitle2>
                                        <input
                                            type="text"
                                            className="rounded-md border border-primary bg-background shadow"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <Subtitle2>
                                            <label htmlFor="name">
                                                Ton nom
                                            </label>
                                        </Subtitle2>

                                        <input
                                            type="text"
                                            className="rounded-md border border-primary bg-background shadow"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <Subtitle2>
                                        <label htmlFor="name">Ton email</label>
                                    </Subtitle2>

                                    <input
                                        type="text"
                                        className="rounded-md border border-primary bg-background shadow"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Subtitle2>
                                        <label htmlFor="name">
                                            Ton message
                                        </label>
                                    </Subtitle2>

                                    <textarea
                                        className="rounded-md border border-primary bg-background shadow"
                                        rows={5}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <Button size={'sm'}>Envoyer</Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
