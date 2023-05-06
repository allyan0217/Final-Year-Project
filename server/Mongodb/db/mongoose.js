const mongoose=require('mongoose')


mongoose.connect("mongodb+srv://mobileapp:mobileapp@cluster0.fopw1it.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log('connected')
}).catch(()=>{
    console.log('Not connected')
})