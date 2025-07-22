import { PasswordInput, rem, TextInput, Checkbox,Anchor, Button, Radio, Group } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import signupValidation from "../Services/FormValidation";

const form={
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    accountType:"APPLICANT",
}

const Signup = () => {
     const [value, setValue] = useState('react');

     const [data,setData]=useState(form);
     const [formError,setFormError]=useState(form);

     const handleChange=(event:any)=>{
        if(typeof(event)=="string"){
            setData({...data,accountType:event});
            return ;
        }
        let name=event.target.name , value=event.target.value;
        setData({...data,[name]:value});
        setFormError({...formError,[name]:signupValidation(name,value)})
     }
     const handleSubmit=()=>{
        registerUser(data).then((res)=>{
            console.log(res);
        }).catch((err)=>console.log(err));
     }

    return <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>
        <TextInput value={data.name} onChange={handleChange} name="name"
            label="Full Name"
            placeholder="Your Name "
            withAsterisk
            error={formError.name}
        />
        <TextInput value={data.email} onChange={handleChange} name="email"
            leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
            label="E-mail"
            withAsterisk
            placeholder="Your email"
            error={formError.email}
        />
        <PasswordInput error={formError.password} value={data.password} name="password" onChange={handleChange} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
        <PasswordInput error={formError.confirmPassword} value={data.confirmPassword} name="confirmPassword" onChange={handleChange} withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm Password" />
         <Radio.Group 
        value={data.accountType} 
        onChange={handleChange}
        name="favoriteFramework"
        label="You're ?"
        withAsterisk
    >
        <Group mt="xs">
      <Radio className="py-4 px-6 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border border-mine-shaft-800 rounded-lg " autoContrast value="APPLICANT" label="APPLICANT" />
      <Radio className="py-4 px-6 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border border-mine-shaft-800 rounded-lg " autoContrast value="EMPLOYER" label="EMPLOYER" />
      </Group>
    </Radio.Group>
        <Checkbox autoContrast label={<>I accept {''}<Anchor>Terms & Conditions</Anchor></>}/>
        <Button onClick={handleSubmit} autoContrast variant="filled">Sign up</Button>

        <div className="mx-auto">Have an account ?<Link to="/login" className="text-bright-sun-400 hover:underline">Login</Link></div>
    </div>
}

export default Signup;