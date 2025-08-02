const Skills = () => {
    return <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">Skills<ActionIcon onClick={() => handleEdit(2)} size="lg" color="brightSun.4" variant="subtle" >
            {edit[2] ? <IconDeviceFloppy className="h-4/5 w-4/5" /> : <IconPencil className="h-4/5 w-4/5" />}
        </ActionIcon></div>
        {
            edit[2] ? (
                <TagsInput
                    value={skills}
                    onChange={setSkills}
                    placeholder="Add skill"
                    splitChars={[',', ' ', '|']}
                />
            ) : (
                <div className="flex flex-wrap gap-2">
                    {
                        profile?.skills?.map((skill: any, index: number) => (
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-4 py-1">{skill}</div>
                        ))
                    }
                </div>
            )
        }
    </div>
}

export default Skills;