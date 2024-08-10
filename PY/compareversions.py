# Import regex
import re

def compare_versions(v1, v2):
	# Helper function to parse version strings into an object
	def parse_version(input_version):
		# Original regex from (c) semver.org
		match = re.match(r'^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$', input_version)
		if not match:  # If the version format is incorrect
			return None
		return {  # If the version was correctly parsed by regex
			'common': [int(match.group(1)), int(match.group(2)), int(match.group(3))],
			'prerelease': match.group(4).split('.') if match.group(4) else []
		}

	# Parse version strings into objects
	parsed_v1 = parse_version(v1)
	parsed_v2 = parse_version(v2)

	# Check if parsing failed
	if not parsed_v1 or not parsed_v2:
		return -2  # Return error

	# Destructure parsed versions for easier access
	common1, prerelease1 = parsed_v1['common'], parsed_v1['prerelease']
	common2, prerelease2 = parsed_v2['common'], parsed_v2['prerelease']

	# Compare numerical parts (major, minor, patch)
	for i in range(3):
		if common1[i] > common2[i]:
			return 1  # v1 > v2
		if common1[i] < common2[i]:
			return -1  # v1 < v2

	# Check if one version has prerelease and the other does not
	if not prerelease1 and prerelease2:
		return 1  # v1 has no prerelease; v2 has prerelease, so v1 > v2
	if prerelease1 and not prerelease2:
		return -1  # v1 has prerelease; v2 has no prerelease, so v2 > v1
	if not prerelease1 and not prerelease2:
		return 0  # versions are equal

	# Compare prerelease identifiers
	for i in range(max(len(prerelease1), len(prerelease2))):
		# Temporary variables for single prerelease identifier; if some of them are undefined, it equals to -1 for correct comprassion
		pid1 = prerelease1[i] if i < len(prerelease1) else '-1'
		pid2 = prerelease2[i] if i < len(prerelease2) else '-1'

		# Check if identifiers are numeric
		is_numeric1 = pid1.isdigit()
		is_numeric2 = pid2.isdigit()

		# If both identifiers are numeric, compare them numerically
		if is_numeric1 and is_numeric2:
			num1, num2 = int(pid1), int(pid2)
			if num1 != num2:
				return 1 if num1 > num2 else -1
		elif is_numeric1 != is_numeric2:  # If one is numeric and the other isn't
			return -1 if is_numeric1 else 1  # Numeric has lower priority
		else:
			# Lexical comparison for non-numeric identifiers
			if pid1 != pid2:
				for j in range(max(len(pid1), len(pid2))):
					# Temporary variables for single character of identifier; if some of them are undefined, it equals to 'space' for correct comparison
					char1 = pid1[j] if j < len(pid1) else ' '
					char2 = pid2[j] if j < len(pid2) else ' '

					# Compare characters by ASCII value
					if ord(char1) != ord(char2):
						return 1 if ord(char1) > ord(char2) else -1

	# If all comparisons are equal, versions are considered equal
	return 0