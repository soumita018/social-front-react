let a = [
  {
    user: {
      name: "sou",
      id: "1"
    }
  },
  {
    user: {
      name: "jaggery",
      id: "2"
    }
  },
  {
    user: {
      name: "banar",
      id: "3"
    }
  }
];

export const findElement = (thelist, tofind) => {
  let found = -1;
  thelist.forEach((item, index) => {
    if (item.user.id === tofind) {
      //   console.log("did", index);
      found = index;
    }
  });
  return found;
};
