import { Button, Modal, PasswordInput, PinInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";


const ResetPassword=(props:any)=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [passErr,setPassErr]=useState("");
    const [otpsent,setOtpSent]=useState(false);
    const [otpSending,setOtpSending]=useState(false);
    const [verified, setVerified]=useState(false);
    const [resendLoader,setResendLoader]=useState(false);
    const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if(seconds===0){
        setResendLoader(false);
        setSeconds(60);
        interval.stop();
    }else setSeconds((s) => s - 1)}
    , 1000);


    const handleSendOtp=()=>{
        sendOtp(email).then((res)=>{
            successNotification("OTP Sent Successfully","Enter OTP to reset.")
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err)=>{
            console.log(err);
            setOtpSending(false);
            errorNotification("OTP Sending Failed!",err.response.data.errorMessage);
        })

    }
    const handleVerifyotp=(otp:string)=>{
        verifyOtp(email,otp).then((res)=>{
            console.log(res);
            successNotification("OTP Verified","Enter new password to reset.");
            setVerified(true);

        }).catch((err)=>{
            console.log(err);
            errorNotification("OTP Veification Failed",err.response.data.errorMessage);
        })
    }
    const resendOtp=()=>{
        if(resendLoader)return;
        handleSendOtp();

    }
    const changeEmail=()=>{
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();

    }
    const handleResetPassword=()=>{
        changePass(email,password).then((res)=>{
            console.log(res);
            successNotification("Password Changed","Login with new Password.");
            props.close();
        }).catch((err)=>{
            console.log(err);
            errorNotification("Password Failed!",err.response.data.errorMessage);
        })
    }
    return  <Modal opened={props.opened} onClose={props.close} title="Reset Password">

        <div className="flex flex-col gap-6">
             <TextInput
                        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
                        label="E-mail"
                        withAsterisk
                        placeholder="Your email"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        rightSection={<Button loading={otpSending && !otpsent } size="xs" className="mr-1" onClick={handleSendOtp} autoContrast disabled={email===""||otpsent} variant="filled">Send OTP</Button>
                        }
                        rightSectionWidth="xl"
                    />
                    {otpsent && 
                    <PinInput onComplete={handleVerifyotp} 
                    length={6} size="md" gap="lg" 
                    className="mx-auto " type="number"/>}
                    {otpsent &&  !verified && 
                    <div className="flex gap-2">
                        <Button loading={otpSending}  
                        onClick={resendOtp} 
                        autoContrast  
                        color="brightSun.4"
                        fullWidth
                        variant="light">{resendLoader?seconds:"Resend"}</Button>

                        <Button loading={otpSending} 
                        onClick={changeEmail} 
                        autoContrast 
                        fullWidth
                        variant="filled">Change Email</Button>
                    </div>
                    }
                    {
                        verified && 
                        <PasswordInput 
                    withAsterisk
                    leftSection={<IconLock size={18} stroke={1.5} />}
                    label="New Password"
                    placeholder="Change Password"
                    value={password}
                    error={passErr}
                    name="password"
                    onChange={(e)=>{setPassword(e.target.value); 
                        setPassErr(signupValidation("password",e.target.value))}} 
                    />
                    }
                    {
                        verified && <Button onClick={handleResetPassword}
                        autoContrast
                        variant="filled">Password</Button>
                    }
        </div>
      </Modal>
}
export default ResetPassword;