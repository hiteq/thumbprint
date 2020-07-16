---
title: Avatar
description: Display user images and badges on Thumbtack.
---

## Summary
Avatars provide a container for displaying Entity or User images on Thumbtack. This `UIView` container displays either the filled images after loading the image via URL or the blank Avatar view if there’s no backing image and initials are provided.

Use `EntityAvatar` or `UserAvatar` classes directly depending on the object to be displayed.

<div>
<b>Entity</b>: a company, business, or service. A square with our standard 4px border-radius is best here.
</div>

<div>
<b>User</b>: a person or user. A circle is best suited for people - primarily faces.
</div>

insert iOS screenshots here

```swift
let entityAvatar = EntityAvatar(size: .medium)
entityAvatar.name = “Nicolas Cage”
entityAvatar.initials = “NC”
entityAvatar.setImageURL(avatarImageURL)

let userAvatar = UserAvatar(size: .medium)
userAvatar.name = “Nicolas Cage”
userAvatar.initials = “NC”
userAvatar.setImageURL(avatarImageURL)
```

## Accessibility
Provide the `name` property to override the view’s accessibility label. If not provided, the accessibility label will be `nil`.

## Public API
### `public var image: UIImage?`
The image displayed in the avatar image view.

### `public var size: Avatar.Size`
One of the provided avatar sizes: `xSmall`, `small`, `medium`, `large`, `xLarge`

### `public var isOnline: Bool`
Boolean value that controls whether the online badge is shown or not.

insert iOS screenshot for online badges

### `public var initials: String?`
The initials to be shown when displaying the blank avatar. Any string longer than one character will be truncated for display.

### `public var name: String?`
Used for accessibility label for the avatar.

### `public init(size: Avatar.Size, initials: String? = nil, name: String? = nil, isOnline: Bool = false)`
Initializes an EntityAvatar/UserAvatar.
Parameters:
size: The initial `Avatar.Size` class for the component.
initials: Any string longer that one character will be truncated for display.
name: Used for accessibility label for the avatar.

*Note*
A URL extension is provided for utility for loading a remote image. It is not part of the core Thumbprint API as it relies on SDWebImage.

### `func setImageURL(_ url: URL?) -> SDWebImageOperation?`
Loads an image from the given URL and sets a blank placeholder image while loading. Once loaded, the image is displayed in the Avatar.