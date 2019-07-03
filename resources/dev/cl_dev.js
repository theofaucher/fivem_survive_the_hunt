/// <reference path="C:\Users\User\Desktop\FiveM_Hide_And_Seek\server-data\autocompletion\typings\index.d.ts" />


RegisterCommand("e", (source, args)=>{
    command = args.join(" ")
    console.log(`Executing: ${command}`)
    console.log(`Returned : ${eval(command)}`)
})