import { Typography } from '@material-ui/core';

const Details = props => {
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    address: { streetAddress, city, state, zip, description },
  } = props;

  return (
    <>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          id:&nbsp;
        </Typography>
        {id}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          firstName:&nbsp;
        </Typography>
        {firstName}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          lastName:&nbsp;
        </Typography>
        {lastName}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          email:&nbsp;
        </Typography>
        {email}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          phone:&nbsp;
        </Typography>
        {phone}
      </Typography>
      <Typography variant="body2" display="block" color="textPrimary">
        address:
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          streetAddress:&nbsp;
        </Typography>
        {streetAddress}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          city:&nbsp;
        </Typography>
        {city}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          state:&nbsp;
        </Typography>
        {state}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          zip:&nbsp;
        </Typography>
        {zip}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        <Typography display="inline" color="textPrimary">
          description:&nbsp;
        </Typography>
        {description}
      </Typography>
    </>
  );
};

export default Details;
