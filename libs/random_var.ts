export const random_variable_generate =(n)=>{
        const alpha_data = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
        let generated_url = ""
        for(let i = 0 ; i<n;i++){
            generated_url+=alpha_data[Math.floor(Math.random() * alpha_data.length)];
        }
        return generated_url;
}
