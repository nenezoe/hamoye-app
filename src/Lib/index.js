export const stringIsEqual = (firstString, secondString) => {
    return (
      new String(firstString).valueOf() == new String(secondString).valueOf()
    );
  };