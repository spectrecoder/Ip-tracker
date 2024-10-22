import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import addressData from "../address.json";
import iconArrow from "../public/images/icon-arrow.svg";

export default function Form({setModuleInfo}) {
  const router = useRouter()
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let foundAddress = null;
    // Check if the entered value is a model name from address.json
    const models = addressData.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
    const model = models.length > 0 ? models[0] : null;
    if (model) {
      // Extract the IP address from the address string
      const ipAddress = model.address.split(':')[0];
      foundAddress = ipAddress;
    } else {
      foundAddress = value; // Use the entered value as is
    }

    if (foundAddress) {
      router.replace(`/?value=${foundAddress}`)
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    setValue(value.replace(/\s/g, ""));
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        value={value}
        placeholder="Search for any IP address or domain"
        onChange={handleChange}
        onBlur={handleBlur}
        required
      />
      <button className="flex items-center justify-center btn" type="submit">
        <Image src={iconArrow} alt="Icon Arrow" />
      </button>
    </form>
  );
}
