import { ReactChildren } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const REGIONS = gql`
  {
    Region(orderBy: name_asc) {
      name
      children: subregions(orderBy: name_asc) {
        name
        children: countries(orderBy: name_asc) {
          name
        }
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(REGIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const renderList = (list: any) => (
    <ul>
      {list.map(
        ({ name, children }: { name: string; children: ReactChildren }) => (
          <li>
            {name}
            {children ? renderList(children) : null}
          </li>
        )
      )}
    </ul>
  );

  return renderList(data.Region);
};

export default App;
