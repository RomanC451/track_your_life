import React from "react";

import { MdOutlineCancel } from "react-icons/md";

import { Button } from ".";

const CloseButton = ({ callBack, classNames }) => {
  return (
    <Button
      icon={<MdOutlineCancel />}
      color="rgb(153, 171, 180)"
      bgHoverColor="light-gray"
      size="2xl"
      borderRadius="50%"
      callBack={callBack}
      classNames={classNames}
    />
  );
};

export default CloseButton;
