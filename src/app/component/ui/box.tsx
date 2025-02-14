export const Box = ({url} : {
    url    : string,
    status : boolean
})=>{
    return (
        <div className="w-full flex justify-between">
            <div>{url}</div>
        </div>
    )
}