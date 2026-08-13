import Button from '../components/Button';
import Card from '../components/Card';
import StarFill from '../components/StarFill';
import StarStroke from '../components/StarStroke';
import Subtitle from '../components/Subtitle';
import Subtitle2 from '../components/Subtitle2';
import Tache from '../components/Tache';

export default function Contact({ content }: { content: any }) {
    return (
        <div id="contact" className="relative overflow-hidden py-20">
            <Tache className="text-forground absolute top-[50%] left-[50%] z-10 w-120 translate-x-[-30%] translate-y-[-50%] rotate-70" />
            <div className="mx-auto w-full max-w-250 py-20">
                <Subtitle>{content?.title || 'Contact Title'}</Subtitle>
                <Subtitle2>{content?.subtitle}</Subtitle2>

                <div className="flex w-full justify-between">
                    {/* LEFT SIDE  */}
                    <div className="relative mt-10 space-y-8">
                        <StarStroke className="absolute -top-35 right-0 w-7 text-secondary" />
                        <StarFill className="text-forground absolute -bottom-25 left-0 w-7 rotate-50" />
                        <StarStroke className="text-forground absolute -bottom-30 left-15 w-7" />
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
                    <div className="relative flex basis-1/2 justify-end">
                        <StarStroke className="text-forground absolute -top-30 right-15 w-7 rotate-12" />
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
