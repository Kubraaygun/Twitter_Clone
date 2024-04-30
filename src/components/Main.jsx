import Form  from "./Form";

const Main = ({user}) => {
  return (
    <main className="border border-gray-700 overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-gray-700">
        Anasayfa
      </header>
      <Form user={user} />
    </main>
  );
};

export default Main;
