export const Link = ({name, href} : {
    name : string,
    href : string
})=>{
    return (<div>
            <a href={href} className="hover:text-slate-700 transition duration-300 ">{name}</a>
        </div>
    )
}