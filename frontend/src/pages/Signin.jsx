
import { Heading } from "../components/Heading"
import { SubHeading } from "../components/SubHeading"
import { InputBox } from "../components/InputBox"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg w-80 h-max text-center p-2 px-4">
                <Heading label="Sign In" />
                <SubHeading label={"Enter your credentials to create an account"} />
                <InputBox placeholder="kavish@gmail.com" label={"Email"} />  
                <InputBox placeholder="********" label={"Password"} /> 
                <div className="pt-4">
                <Button label={"Sign in"} />
                </div>
                <ButtonWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
        
    </div>
}