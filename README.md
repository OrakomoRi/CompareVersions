# Compare Versions Tool

The compareVersions function is a JavaScript utility for comparing two version strings and determining their relationship. The comparison considers numerical values as well as predefined stage values, e.g., 'alpha', 'beta', etc. (for the full list visit documentation about [Version string format](#version-string-format)).

## Connect

Integrate it on your page by the following [link](https://raw.githubusercontent.com/OrakomoRi/CompareVersions/main/compareversions.min.js)

### Example in \<head\> element

```html
<head>
	<script src="https://raw.githubusercontent.com/OrakomoRi/CompareVersions/main/compareversions.min.js" defer>
</head>
```

## Usage
```js
let result = compareVersions(version1, version2);
```

## Documentation

### Parameters

- **version1 (String)**: The first version string to be compared
- **version2 (String)**: The second version string to be compared

### Return codes

#### Normal

- **1**: Indicates that *version1* is greater than *version2*
- **-1**: Indicates that *version1* is less than *version2*
- **0**: Indicates that *version1* is equal to *version2*

#### Error

- **-2**: Indicates an error code, specifically that some of versions has an incorrect format


### Version string format

- Stage values like '*pre*', '*alpha*', '*beta*', '*gamma*', '*delta*', '*release*', '*final*' are supported

- The version strings can contain numerical values separated by dots, underscores and hyphens

### Examples

#### Correct version format

- 4.2_alpha2
- 1.5
- 1.2.3-pre1.2.3
- 1.7_final-2
- 0.2.4-release

#### Incorrect format

- 5.2 pre-5 (spaces cannot be used)
- 1.7_sigma-2 (sigma is not the supported stage)
- v1,4 (no comma can be used, also no 'v' before version is needed)