import { Link, Typography } from "@material-ui/core"

export const Footer = () => {
  return <footer>
    <div className="flex flex-col sm:flex-row sm:space-x-4">
      <Typography variant="body2" display="block">
        Made with ❤️ by <Link target="_blank" href="https://f-bit.software" color="secondary">f-bit software</Link>
      </Typography>
      <Typography variant="body2" display="block">
        Enjoy it? <Link target="_blank" href="https://buymeacoffee.com/fensterbank" color="secondary">☕ Buy me a coffee.</Link>
      </Typography>
    </div>
    <Typography variant="body2" display="block">
      Fork me on <Link target="_blank" href="https://github.com/Fensterbank/random-daily-drive" color="secondary">Github</Link>
    </Typography>
  </footer>
}
