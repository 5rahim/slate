export const useInstituteID = () => {
   
   if(window) {
   
      const { host } = window.location;
      let isDev = host.includes("localhost");
      let splitHost = host.split(".");
   
      return splitHost[0]
      
   }
   
   return null
   
}
