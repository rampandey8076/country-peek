import { useParams, useNavigate } from "react-router-dom";
import useCountry from "../hooks/useCountry";

function CountryPage() {
  const { code } = useParams();
  const navigate = useNavigate();

  const { country, loading, error } = useCountry(code);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!country) return null;

  const {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
  } = country;

  const langList = languages ? Object.values(languages) : [];
  const currList = currencies
    ? Object.values(currencies).map((c) => c.name)
    : [];

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{name.common}</h2>
      <p>{name.official}</p>

      <img src={flags.svg} alt={name.common} width="200" />

      <p><b>Population:</b> {population.toLocaleString()}</p>
      <p><b>Region:</b> {region}</p>
      <p><b>Subregion:</b> {subregion}</p>
      <p><b>Capital:</b> {capital?.[0] ?? "N/A"}</p>
      <p><b>Languages:</b> {langList.join(", ")}</p>
      <p><b>Currencies:</b> {currList.join(", ")}</p>

      {borders && (
        <div>
          <b>Borders:</b>
          {borders.map((b) => (
            <span key={b} style={{ margin: "5px" }}>
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default CountryPage;