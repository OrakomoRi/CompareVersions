# Compare Versions Tool 2.0.0

Based on [Semantic Versioning 2.0.0](https://semver.org/).

The compareVersions function is a JavaScript utility for comparing two version strings and determining their relationship. The comparison considers numerical values as well as additional identifiers that can contain both letters and numbers.
For full understanding visit the [official documentation](https://semver.org/#semantic-versioning-specification-semver).

## Connect

You can check the needed folder (e.g. JS, PY, etc.) to find the way to connect.

## Documentation

### Function by itself

```
compareVersions(version1, version2)
```

### Parameters

- **version1 (String)**: The first version string to be compared
- **version2 (String)**: The second version string to be compared

### Return codes

#### Normal

- **1**: Indicates that '*version1*' is greater than '*version2*'
- **-1**: Indicates that '*version1*' is less than '*version2*'
- **0**: Indicates that '*version1*' is equal to '*version2*'

#### Error

- **-2**: Indicates an error code, specifically that some of versions has an incorrect format


### Version string format

- Version number in format: MAJOR.MINOR.PATCH

- Pre-release identifiers are available after '-' ```(hyphen)``` symbol

- Build metadata identifiers are available after '+' ```(plus)``` sign

- A version MAY NOT contain pre-release or metadata identifiers, but it MAY contain either one of them or both simultaneously.

- If the initial letters of two prereleases of versions are the same then the version with the most characters will be greater.

- If one version contains build metadata and the other does not, and both versions have the same MAJOR.MINOR.PATCH, and they have no pre-releases or their pre-releases are the same, these versions are considered equal

### Examples

#### Correct version format

- 1.5.0
- 1.2.3-pre1.2.3
- 0.2.4-release
- 2.9.3-rc.3.beta
- 2.2.9+version------fixed
- 0.0.1+build0.1

#### Incorrect format

- 1 (common version number MUST take the form X.Y.Z)
- 3.8 (common version number MUST take the form X.Y.Z)
- 5.2 build-5 (spaces cannot be used)
- 4.2_alpha2 (underscore cannot be used)
- v1,4 (no comma can be used, also no 'v' before version is needed)