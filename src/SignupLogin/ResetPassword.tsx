import { Button, Modal, PinInput, rem, TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { sendOtp } from "../Services/UserService";

const ResetPassword=(props:any)=>{
    const [email,setEmail]=useState("");
    const [otpsent,setOtpSent]=useState(false);
    const [otpSending,setOtpSending]=useState(false);
    const handleSendOtp=()=>{
        sendOtp(email).then((res)=>{
            setOtpSent(true);
            setOtpSending(false);
        }).catch((err)=>{
            console.log(err);
            setOtpSending(false);
        })

    }
    const handleVerifyotp=(otp:string)=>{
        console.log(otp);
        // setOtpSent(false);
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
                        rightSection={<Button loading={otpSending} size="xs" className="mr-1" onClick={handleSendOtp} autoContrast disabled={email===""||otpsent} variant="filled">Send OTP</Button>
                        }
                        rightSectionWidth="xl"
                    />
                    {otpsent && <PinInput onComplete={handleVerifyotp} length={6} size="md" gap="lg" className="mx-auto " type="number"/>}
                    {otpsent && 
                    <div>
                        <Button loading={otpSending}  
                        onClick={resendOtp} autoContrast  
                        variant="light">Resend</Button>

                        <Button loading={otpSending} 
                        onClick={changeEmail} autoContrast 
                        variant="filled">Change Email</Button>
                    </div>
                    }
        </div>
      </Modal>
}
export default ResetPassword;