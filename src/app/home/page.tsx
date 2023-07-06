import SignOut from "./components/SignOut";
import { Spacer } from "@nextui-org/spacer";

const Page = () => {
    return (
        <main className="p-5 w-screen h-screen flex flex-col">
            <header className="flex justify-between items-center">
                <h1>Day Messages</h1>
                <SignOut/>
            </header>
            <Spacer y={5}/>
            Ola mundo
        </main>
    );
}
 
export default Page;