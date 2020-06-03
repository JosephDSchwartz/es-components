Icon buttons will display an icon in a circle with optional text being placed below.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [isHighlighted, setIsHighlighted] = React.useState(false);

    return (
        <IconButton iconName="man" isHighlighted={isHighlighted} onClick={() => setIsHighlighted(!isHighlighted)}>Text</IconButton>
    );
}

<IconButtonExample/>
```

You can highlight the IconButton to invert the colors and bold the text.

```
<div>
  <IconButton iconName="woman" isHighlighted={true}>Text</IconButton>
</div>
```

Disabling the button will prevent the onChange function from firing and remove some of the styling around clicking and hover.

```
import IconButton from './IconButton';

function IconButtonExample() {
    const [isHighlighted, setIsHighlighted] = React.useState(false);

    return (
        <IconButton iconName="man" disabled isHighlighted={isHighlighted} onClick={() => setIsHighlighted(!isHighlighted)}>Text</IconButton>
    );
}

<IconButtonExample/>
```

Restricting the height will result in the the overflow getting cut off by ellipsis.

```
<div>
  <IconButton iconName="user" maxWidth="175px">Loooooooooooooooooooooooooooooooooooooooooooooooooooooong Texttttttttttttttttttttttttttttttttttttttttttttttttttttttt</IconButton>
</div>
<div>
  <IconButton iconName="user" isHighlighted={true} maxWidth="175px">Loooooooooooooooooooooooooooooooooooooooooooooooooooooong Texttttttttttttttttttttttttttttttttttttttttttttttttttttttt</IconButton>
</div>
```
