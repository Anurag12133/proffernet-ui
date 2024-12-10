
import {useProjectContext} from "@/app/contexts/ProjectContext";
import {Textarea} from "@nextui-org/input";

const ProjectDescription = () => {
    const { description, setDescription } = useProjectContext();

    return (
        <div className="w-full flex  max-w-full description p-5 h-[20rem]">
            <Textarea
                disableAnimation
                disableAutosize
                classNames={{
                    base: "max-w-full",
                    input: "resize-y min-h-[18rem]",
                }}
                label="Description"
                placeholder="Enter your description"
                variant="underlined"
                value={description}
                onValueChange={setDescription}
            />
        </div>
    );
};

export default ProjectDescription;
