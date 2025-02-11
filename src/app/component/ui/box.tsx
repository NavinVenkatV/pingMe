export const Box = ({url} : {
    url : string
})=>{
    return (
        <div className="w-full flex justify-between">
            <div>{url}</div>
        </div>
    )
}