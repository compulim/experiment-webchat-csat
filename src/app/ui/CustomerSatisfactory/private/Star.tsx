type Props = { className?: string };

const Star = ({ className }: Props) => (
  <svg className={className} fill="none" height="32" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14.8057 6.53191C15.2948 5.54091 16.7079 5.54092 17.197 6.53191L19.7709 11.7472L25.5264 12.5836C26.62 12.7425 27.0567 14.0864 26.2653 14.8578L22.1006 18.9174L23.0838 24.6496C23.2706 25.7388 22.1273 26.5694 21.1492 26.0552L16.0013 23.3488L10.8535 26.0552C9.87532 26.5694 8.73209 25.7388 8.9189 24.6496L9.90205 18.9174L5.73736 14.8578C4.946 14.0864 5.38269 12.7425 6.47631 12.5836L12.2318 11.7472L14.8057 6.53191ZM16.0013 7.122L13.4274 12.3373C13.2332 12.7309 12.8578 13.0036 12.4235 13.0667L6.66804 13.903L10.8327 17.9626C11.147 18.2689 11.2904 18.7103 11.2162 19.1428L10.233 24.875L15.3809 22.1686C15.7693 21.9644 16.2334 21.9644 16.6218 22.1686L21.7696 24.875L20.7865 19.1428C20.7123 18.7103 20.8557 18.2689 21.1699 17.9626L25.3346 13.903L19.5792 13.0667C19.1449 13.0036 18.7695 12.7309 18.5753 12.3373L16.0013 7.122Z"
      fill="currentColor"
    />
  </svg>
);

export default Star;
