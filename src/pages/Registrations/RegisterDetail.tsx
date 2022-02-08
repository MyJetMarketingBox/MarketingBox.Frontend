import { useSelector } from "react-redux";

export default ({regId}: any) => {

  const {register} = useSelector((state: any) => {
    return {
      register: state.Registrations.registrations.items.find((item : any) => {
        return item.registrationId = regId
      })
    }
  })

  console.log(register);

  return (
    <>
      {regId}
    </>
  )

}