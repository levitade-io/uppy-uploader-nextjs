<h1 align="center">Welcome to @levitade/uppy-uploader-nextjs 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/@levitade/uppy-uploader-nextjs" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@levitade/uppy-uploader-nextjs.svg">
  </a>
  <a href="https://github.com/levitade-io/uppy-uploader-nextjs#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/levitade-io/uppy-uploader-nextjs/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/levitade-io/uppy-uploader-nextjs/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/levitade-io/uppy-uploader-nextjs" />
  </a>
</p>

> Uppy uploader plugin to use with NextJS Server Actions. 
> 
> ⚠️ This is developed to work with NextJS 14's server actions feature.

- [Github Repository](https://github.com/levitade-io/uppy-uploader-nextjs)
- [NPM Package](https://www.npmjs.com/package/@levitade/uppy-uploader-nextjs)

## Install

- For `npm` users

```sh
npm install @levitade/uppy-uploader-nextjs
```

- For `yarn` users

```sh
yarn add @levitade/uppy-uploader-nextjs
```

- For `pnpm` users

```sh
pnpm add @levitade/uppy-uploader-nextjs
```

## Usage example

### NextJS 14 with Server Action Upload

In your client component

```tsx
'use client';
import React, {useState} from 'react';
import Uppy from '@uppy/core';
import {Dashboard} from '@uppy/react';
import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';

// Import the server action upload plugin
import UppyServerActionUpload from "@levitade/uppy-uploader-nextjs";

// Import your target server action
import {saveFile} from "@/app/actions";

export const UppyUploader = () => {
    const [uppy] = useState(() => new Uppy({
        autoProceed: true,
        restrictions: {
            maxFileSize: 5242880,
            allowedFileTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif']
        }
    }).use(UppyServerActionUpload<string[]>, { // IMPORTANT: pass the server action return type as a type parameter, in this case 'string[]'
        action: saveFile,
        formDataName: 'images' //this defaults to 'files'
    }));

    return <Dashboard hideUploadButton uppy={uppy}/>;
}
```

In your server action (this is just an example)

```ts
'use server';

export async function saveFile(formData: FormData) {
    const files: File[] = formData.getAll('images') as File[];
    const urls: string[] = [];

    for (const file of files) {
        let buffer = await file.arrayBuffer();
        // do things with your buffer such as conversion or compression
        // ...
        // then save the file to your storage

        const uploadedUrl = exampleUploadFunction(buffer);
        urls.push(uploadedUrl);
    }

    return urls;
}
```

## Author

👤 **Bryan de Jong**

* Github: [@bddjong](https://github.com/bddjong)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to
check [issues page](https://github.com/levitade-io/uppy-uploader-nextjs/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2024 [Bryan de Jong](https://github.com/bddjong).<br />
This project is [MIT](https://github.com/levitade-io/uppy-uploader-nextjs/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_