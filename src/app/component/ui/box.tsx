export const Box = ({url, status} : {
    url    : string,
    status : boolean
})=>{
    return (
        <div className="w-full flex justify-between">
            <div>{url}</div>
        </div>
    )
}