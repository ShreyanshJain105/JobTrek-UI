import fields from "../Data/Profile";


const Info=()=>{
    const select = fields;

    return <>
      <div className="text-3xl font-semibold flex justify-between">Jarood Wood
                    <ActionIcon onClick={() => handleEdit(0)} size="lg" color="brightSun.4" variant="subtle" >
                        {edit[0] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
                    </ActionIcon>
                </div>
                {edit[0] ? (
                    <>
                        <div className="flex gap-10 [&>*]:w-1/2">
                            <SelectInput {...select[0]} />
                            <SelectInput {...select[1]} />
                        </div>
                        <SelectInput {...select[2]} />
                    </>
                ) : (
                    <>
                        <div className="text-xl flex gap-1 items-center">
                            <IconBriefcase className="h-5 w-5" stroke={1.5} />
                            SDE • Google
                        </div>
                        <div className="flex gap-1 text-lg text-mine-shaft-300 items-center">
                            <IconMapPin className="h-5 w-5" stroke={1.5} />
                            India
                        </div>
                    </>
                )}
</>
}
export default Info;