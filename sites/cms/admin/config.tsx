function CustomLogo() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <img
        src="https://images.matsu.gov/logo.png"
        alt="The Matanuska-Susitna Borough Seal"
        width="50"
        height="50"
      ></img>
      <h3>MSB CMS</h3>
    </div>
  );
}

export const components = {
  Logo: CustomLogo,
};
