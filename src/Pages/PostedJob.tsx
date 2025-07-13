import PostedJobb from "../PostedJob/PostedJobb";
import PostedJobDescription from "../PostedJob/PostedJobDescription";
const PostedJob = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
            <div className="flex gap-5">
                <PostedJobb/>
                <PostedJobDescription/>
            </div>
        </div>
    )
}

export default PostedJob;