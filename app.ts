const app = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const unit = urlParams.get("unit") || "cellular-automata";

  try {
    const module = await import(`./${unit}/init.ts`);
    module.init();
  } catch (e) {
    console.log(e);
  }
};

app();
