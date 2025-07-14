import { PasswordInput, rem, TextInput, Checkbox,Anchor, Button } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";


const Signup = () => {
    return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput
            label="Full Name"
            placeholder="Your Name "
            withAsterisk
        />
        <TextInput
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            label="E-mail"
            withAsterisk
            placeholder="Your email"
        />
        <PasswordInput withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
        <PasswordInput withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />
        <Checkbox autoContrast label={<>I accept {''}<Anchor>Terms & Conditions</Anchor></>}/>
        <Button autoContrast variant="filled">Sign up</Button>

        <div className="mx-auto">Have an account ?<Link to="/login" className="text-bright-sun-400 hover:underline">Login</Link></div>
    </div>
}

export default Signup;