export const UserFromDataApi = {
   createUser: (body: any) => {
     const formData = new FormData();
     formData.append("firstName", body.firstName);
        formData.append("lastName", body.lastName);
        formData.append("gender", body.gender);
        formData.append("email", body.email);
        formData.append("password", body.password);
        //   formData.append("confirmPassword", body.confirmPassword);
        formData.append("doj", body.doj);
        formData.append("department", body.department.id);
        formData.append("designation", body.designation.id);
        formData.append("mobileNo", body.mobileNo);
     return formData;
   }
 }