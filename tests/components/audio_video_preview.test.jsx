// Copyright (c) 2017-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React from 'react';
import {shallow} from 'enzyme';

import AudioVideoPreview from 'components/audio_video_preview.jsx';
import FileInfoPreview from 'components/file_info_preview.jsx';

describe('component/AudioVideoPreview', () => {
    const requiredProps = {
        fileInfo: {
            extension: 'mov',
            id: 'file_id'
        },
        fileUrl: '/api/v4/files/file_id'
    };

    afterAll(() => {
        jest.clearAllMocks();
    });

    test('should match snapshot without children', () => {
        const wrapper = shallow(
            <AudioVideoPreview {...requiredProps}/>
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot, loaded with FileInfoPreview', () => {
        const wrapper = shallow(
            <AudioVideoPreview {...requiredProps}/>
        );
        wrapper.setState({canPlay: false});
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(FileInfoPreview).exists()).toBe(true);
    });
});
