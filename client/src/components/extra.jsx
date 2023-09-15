<ThemeProvider theme={defaultTheme}>
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Your Name"
              value={name}
              required
              fullWidth
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              className="input"
              value={username}
              type="text"
              label="Username"
              name="username"
              placeholder="Username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              type="password"
              className="input"
              label="password"
              name="password"
              placeholder="********"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
    {/* <Copyright sx={{ mt: 5 }} /> */}
  </Container>
</ThemeProvider>;
