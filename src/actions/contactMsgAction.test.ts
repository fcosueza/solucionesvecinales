import { FormActionState } from "@/types";
import contactMsgAction from "./contactMsgAction";

describe("Test suit for contactMsgAction server action...", () => {
  const prevState: FormActionState = {
    state: "error",
    message: ""
  };

  /*it("Should return a error state if the form data is not correct", async () => {
    const formData: FormData = new FormData();

    formData.append("name", "TestName");
    formData.append("email", "test@gmailc");
    formData.append("msg", "aaaa");

    const data = await contactMsgAction(prevState, formData);

    expect(data.state).toBe("error");
    expect(data.message).toBe("Incorrect form data");
  });*/

  it("Should return a state of success and a message if msg is successfully created", async () => {
    const formData: FormData = new FormData();

    formData.append("name", "TestName");
    formData.append("email", "test@gmai.com");
    formData.append("msg", "This is a testing message FTW. It must be 20 chars long.");

    const data = await contactMsgAction(prevState, formData);

    console.log(data.errors);

    expect(data.state).toBe("error");
    expect(data.message).toBe("Message created successfully");
  });
});
