# Figma Variables & Style Dictionary

This project uses Style Dictionary to transform exported Figma Variables into code that can be utilized for theming / styling of the application. This document intends to describe the process of:

- exporting variables from Figma using a plugin
- transforming these variables into primitive, semantic and/or functional design tokens
- using these tokens within the project.

## Exporting Figma Variables

Figma requires an Enterprise plan to be able to use the [Variables API](https://www.figma.com/developers/api#variables). Because of this, we'll be using a Figma plugin to export our variables into a json file that Style Dictionary can then consume to generate the tokens.

1. Add the [Design Tokens](https://www.figma.com/community/plugin/888356646278934516) plugin to Figma.

2. In the Design Tokens settings screen, make sure all the options match the following configuration:

   ![yulolimum-capture-2024-02-28--13-15-38](https://github.com/infinitered/ReactNativeEssentials/assets/1775841/e5cb3c0b-bbd1-4413-a4c4-b5b33941c7a9)

3. Using the Design Tokens plugin, click "Export Design Token File" and match the the options from the following configuration:

   ![yulolimum-capture-2024-02-28--13-18-45](https://github.com/infinitered/ReactNativeEssentials/assets/1775841/727385ba-26f5-4c92-ab3d-63da9acf5187)

4. When exporting, select the path `./shared/theme/tokens/figmaVariables.json`.

## Generating Design Tokens w/ Style Dictionary

Style Dictionary is a tool that generates design tokens from a [DTCG spec](https://design-tokens.github.io/community-group/format/) JSON file into platform specific code (e.g. Typescript, Swift, CSS, etc) that can then be utilized by the project. In the previous step, Figma Variables were exported to a JSON file. In this step, we'll be using this tool to convert them.

A `./sd.config.js` file has been configured according to our project needs and the patterns defined in our Figma. All you need to do is run the codegen step:

```bash
yarn generate:tokens
```

This step will generate a few files in the `./shared/theme/tokens/` directory. You might want to run the `yarn lint` command to prettify these files as they will be generated with no regards for the syntax requirements of the project.

## Using Design Tokens

Depending on the current needs of the project, there might be multiple "tiers" of tokens that are generated. Each "tier" will be be denoted by the generated file name.

- **Primitive Tokens**: These tokens are the building blocks of any design system and often times are abstracted away and built upon by other layers / tiers of tokens (e.g. semantics). Usually, these are intended to be used in one-off situations or as a reference. Example file name: `colorPrimitives.ts`.

- **Semantic Tokens**: This is the first level of abstraction for primitives and puts a general purpose or intent for tokens. For example a primitive color "black" can be described as a semantic color of "text-base". Or, a primitive color of "red" can be described as a semantic color of "text-danger". Example file name: `colorTextSemantics.ts`.

- **Functional Tokens**: Functional tokens are the next tier of tokens that are intended to describe semantic tokens to a more precise degree. These tokens can be implemented to expand the role of designers in building out the components, as the tokens themselves will contain information for all states of a component. For example, when building out a Card component, you may have a tokens called `cardBorderDefault` and `cardBorderPressed` and `cardBorderDisabled` etc. An example file name: `colorCardBorderTokens.ts`.

In this project, we are mostly relying on the more balanced "semantic" tokens as we have a range of developers with varying degrees of comfort for building out UI.
