import { PasswordInput, rem, TextInput, Checkbox,Anchor, Button, Radio, Group } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { notifications } from "@mantine/notifications";
import {signupValidation} from "../Services/FormValidation";

const form={
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    accountType:"APPLICANT",
}

const Signup = () => {
     const [value, setValue] = useState('react');

     const [data,setData]=useState<{[key:string]:string}>(form);
     const [formError,setFormError]=useState<{[key:string]:string}>(form);
     const navigate = useNavigate();
     const handleChange=(event:any)=>{
        if(typeof(event)=="string"){
            setData({...data,accountType:event});
            return ;
        }
        let name=event.target.name , value=event.target.value;
        setData({...data,[name]:value});
        setFormError({...formError,[name]:signupValidation(name,value)})
        if(name === "password"&&data.confirmPassword!==""){
            let err="";
            if(data.confirmPassword!==value)err="Password do not match.";
            setFormError({...formError,[name]:signupValidation(name,value),confirmPassword:err})
        }
        if(name === "confirmPassword"){
            if(data.password!==value)setFormError({...formError,[name]:"Password do not match."})
            
            else setFormError({...formError,confirmPassword:""});
        }
     }
     const handleSubmit=()=>{
        let valid=true,newFormError:{[key:string]:string}={};
        for(let key in data){
            if(key === "accountType")continue;
            if(key !== "confirmPassword")newFormError[key]=signupValidation(key,data[key]);
            else if(data[key]!== data["password"])newFormError[key]="Passwords do bot match.";
            if(newFormError[key])valid=false;
        }
        setFormError(newFormError);
        // notification 
        if(valid==true){
             registerUser(data).then((res)=>{
            console.log(res);
            setData(form);
          notifications.show({
          title: 'Registered Successfully',
          message: 'Redirecting to login page...',
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"teal",
          withBorder:true,
          className:"!border-green-500"
        })
        setTimeout(()=>{
            navigate("/login");
        },2000)
            
        }).catch((err)=>{
            console.log(err);
             notifications.show({
          title: 'Registration Failed!!',
          message: err.response.data.errorMessage,
          withCloseButton:true,
          icon:<IconX style={{width:"90%",height:"90%"}}/>,
          color:"red",
          withBorder:true,
          className:"!border-red-500"
        })
        });
        }
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

        <div className="mx-auto">Have an account ?<span onClick={()=>{
            navigate("/login");setFormError(form);setData(form)
        }} className="text-bright-sun-400 hover:underline cursor-pointer">Login</span></div>
    </div>
}

export default Signup;