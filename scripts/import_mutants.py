import argparse
import json

BULLET = "â€¢"
PL_TAG = "PL"
MR_TAG = "MR"
NAME_TAG = "Name"


def process_args():
    parser = argparse.ArgumentParser(
        description="Import mutants character data from a file"
    )
    parser.add_argument(
        "-f", "--filename", type=str, required=True, help="File containing mutants"
    )
    args = parser.parse_args()
    return args


def process_file(filename):
    json_data = None
    with open(filename, "r") as f:
        for line in f:
            print(line)
            if BULLET in line:
                json_data = parse_name_line(line)


def parse_name_line(line):
    # data = line.split("\u2022")
    data = line.split(BULLET)
    name_pl = data[0].split(PL_TAG)
    name = name_pl[0].strip()
    power_level = name_pl[1].strip()
    mr = data[1].strip()
    returnDict = {NAME_TAG: name, PL_TAG: power_level, MR_TAG: mr}
    print(returnDict)
    json_data = json.dumps(returnDict, indent=2)
    print(json_data)
    return json_data


def main():
    args = process_args()
    print(args.filename)
    process_file(args.filename)


if __name__ == "__main__":
    main()
